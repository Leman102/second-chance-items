const { AuthenticationError } = require('apollo-server-express');
const { User, Item } = require('../models');
const { signToken } = require('../utils/auth');
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
            //return User.findOne({ _id: context.user._id });
            const userData = await User.findOne({ _id: context.user._id})
            .select('-__v -password')
            .populate('items')
            return userData;
        }
        throw new AuthenticationError("You need to be logged in!");
    },
    //get all users
    users: async () => {
        return User.find().populate('items')
    },
    //get all items
    items: async (parent, { username }) => {
        const params = username ? { username } : {};
        const data = await Item.find(params).sort({ createdAt: -1 })
            .populate('user')
        return (data)
    },
    // get an Item by id
    item: async (parent, { _id }) => {
        return Item.findOne({ _id });
    },
},

Mutation: {
    addUser: async (parent, newUser, context) => {
        const user = await User.create(newUser);
        if (!user) {
            throw new AuthenticationError("Something is wrong!");
        }
        const token = signToken(user);
        return { token, user };
    },
    login: async (_, { username, email, password }) => {
        const user = await User.findOne({
            $or: [{ username: username }, { email: email }],
        });
        if (!user) {
            throw new AuthenticationError("Can't find this user");
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
            throw new AuthenticationError("Wrong password!");
        }
        const token = signToken(user);
        return { token, user };
    },
    addItem: async(parent, args, context) => {
        if(context.user) {
            const item = await Item.create({ ...args, username: context.user.username });

            await User.findByIdAndUpdate(
                { _id: context.user._id},
                { $push: { items: item._id } },
                { new: true }
            );

            return item;
        }
        throw new AuthenticationError('You need to be logged in!');
    },
  }
}

module.exports = resolvers;
