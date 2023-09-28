const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

const create = async (req, res, next) => {
  const { name } = req.body;
  if (!name) return next(new ApiError(400, "Name cannot be empty"));

  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.create(req.body);
    res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    );
  }
};

const findAll = async (req, res, next) => {
  let documents = [];

  try {
    const contactService = new ContactService(MongoDB.client);
    const { name } = req.query;

    if (name) documents = await contactService.findByName(name);
    else documents = await contactService.find({});

    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving contacts")
    );
  }
};

const findOne = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.findById(req.params.id);

    if (!document) return next(new ApiError(404, "Contact not found"));

    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving contact with id = ${req.params.id}`)
    );
  }
};

const update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    return next(new ApiError(400, "Data to update can not be empty"));

  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.update(req.params.id, req.body);

    if (!document) return next(new ApiError(404, "Contact not found"));

    return res.send({ message: "Contact was updated successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving contact with id = ${req.params.id}`)
    );
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.delete(req.params.id);

    if (!document) return next(new ApiError(404, "Contact not found"));

    return res.send({ message: "Contact was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete contact with id = ${req.params.id}`)
    );
  }
};

const deleteAll = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const deleteCount = await contactService.deleteAll();

    return res.send({
      message: `${deleteCount} contacts were deleted successfully`,
    });
  } catch (error) {
    return next(
      new ApiError(500, `An error occurred while remove all contacts`)
    );
  }
};

const findAllFavorite = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const documents = await contactService.findFavorite();

    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, `An error occurred while retrieving favorite contacts`)
    );
  }
};

export {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
  deleteAll,
  findAllFavorite,
};
