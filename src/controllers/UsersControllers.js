import { prisma } from '../database/index.js';

export class UsersController {
  constructor() {}

  async getUser(request, response) {
    // ID of the user to return
    const { id } = request.params;

    // Parse the ID to an integer and check if it is valid
    const userId = parseInt(id, 10);

    if (isNaN(userId)) return response.status(400).json({ error: 'Invalid ID' });

    // Get user on database
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // If user not found, return 404
    if (!user) return response.status(404).json({ message: 'User not found' });

    // Return user
    return response.json(user);
  }

  async getUsers(request, response) {
    // Get query parameters
    const { page = 1, perPage = 10 } = request.query;

    // Parse the page and perPage to integers and check if they are valid
    const pageNumber = Math.abs(parseInt(page, 10));
    const perPageNumber = Math.abs(parseInt(perPage, 10));

    if (isNaN(pageNumber) || isNaN(perPageNumber))
      return response.status(400).json({ error: 'Invalid page or perPage' });

    // Get users on database
    const users = await prisma.user.findMany({
      skip: (pageNumber - 1) * perPageNumber,
      take: perPageNumber,
      select: {
        id: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Return users
    return response.json({
      page: pageNumber,
      perPage: perPageNumber,
      users,
    });
  }

  async createUser(request, response) {
    // Get user data from request body
    const { username, password } = request.body;

    // Check if username and password are valid
    if (!username || !password)
      return response.status(400).json({ error: 'Invalid username or password' });

    // Check if user exists with the same username
    const userExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    // If user exists, return 409
    if (userExists) return response.status(409).json({ message: 'User already exists' });

    // Create user on database
    const user = await prisma.user.create({
      data: {
        username,
        password,
      },
    });

    delete user.password;

    // Return user
    return response.status(201).json(user);
  }

  async updateUser(request, response) {
    // ID of the user to update
    const { id } = request.params;

    // Get user data from request body
    const { username, password } = request.body;

    // Parse the ID to an integer and check if it is valid
    const userId = parseInt(id, 10);

    if (isNaN(userId)) return response.status(400).json({ error: 'Invalid ID' });

    // Check if username and password are valid
    if (!username && !password)
      return response.status(400).json({ error: 'Invalid username or password' });

    // Verify if user exists
    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // If user not found, return 404
    if (!userExists) return response.status(404).json({ message: 'User not found' });

    // Update user on database
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        password,
      },
    });

    // remove password from user object
    delete user.password;

    // Return user
    return response.json(user);
  }

  async deleteUser(request, response) {
    // ID of the user to delete
    const { id } = request.params;

    // Parse the ID to an integer and check if it is valid
    const userId = parseInt(id, 10);

    if (isNaN(userId)) return response.status(400).json({ error: 'Invalid ID' });

    // Verify if user exists
    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // If user not found, return 404
    if (!userExists) return response.status(404).json({ message: 'User not found' });

    // Delete user on database
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    // Return user
    return response.status(204).send();
  }
}