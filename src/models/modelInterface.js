'use strict';

class modelInterface {
  constructor(model) {
    this.model = model;
  }

  async create(json) {
    try {
      let result = await this.model.create(json);
      return result;
    } catch (err) {
      console.error(err);
      return err;
    }

  }

  async readOne(id) {
    try {
      return await this.model.findOne({where: { id }});
    } catch(err){
      console.error(err);
      return err;
    }

  }

  async readAll() {
    try {
      return await this.model.findAll();
    } catch(err){
      console.error(err);
      return err;
    }
  }

  async readWithRelations(id, options) {
    try {
      let query = {where: { id }, ...options };
      return await this.model.findOne(query);
    } catch(err){
      console.error(err);
      return err;
    }
  }

  async update(id, json) {
    try {
      return await this.model.update(json, {where: { id }});
    } catch(err){
      console.error(err);
      return err;
    }
  }

  async delete(id) {
    try {
      let deletedInstance = await this.model.findOne({where: { id }});
      await this.model.destroy({where: { id }});
      return deletedInstance;
    } catch(err){
      console.error(err);
      return err;
    }
  }

  async findOne(json) {
    try {
      let user = await this.model.findOne({where: json});
      return user;
    } catch (err) {
      console.log(err.toString());
      return undefined;
    }
  }

}

module.exports = {modelInterface};
