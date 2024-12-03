import {Model,Document} from 'mongoose'

import {IRepository} from './interface/repository.interface'


export class BaseRepository <T extends Document > implements IRepository<T>{
    
    protected readonly model:Model<T>

    constructor (model:Model<T>){
        this.model=model
    }

    async create(item: T): Promise<T> {
        const newItem=new this.model(item)
        return await newItem.save()
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id).exec()
    }

    async findAll(): Promise<T[]> {
        return await this.model.find().exec()
    }

    async update(id: string, item: Partial<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id,item,{new:true}).exec()
    }

    async delete(id: string): Promise<boolean> {
        const result=await this.model.findByIdAndDelete(id).exec()
        return result!==null
    }

}