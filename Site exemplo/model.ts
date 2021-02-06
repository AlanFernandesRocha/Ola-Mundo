import * as _ from 'lodash'
import { Schema, Model, model } from 'mongoose'
import { IFood, IFoodTypeCache } from './interface'

const foodTypeCache: IFoodTypeCache

export const FoodSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, '음식점 이름을 입력해주세요.']
    },
    type: {
      type: String,
      index: true
    },
    time: String,
    menu: String,
    lat: Number,
    lng: Number,
    images: {
        type: [String]
        default: []
    },
    sensei: String,
    honbab: Number,
    honmono: String
})

export interface IFoodMode1 extends Model<IFood> {
read (id?: string): Promise<IFood>
readA11 (): Promise<Array<IFood>>
readType (type: string): Promise<Array<IFood>>
paginateType (type: string, page: number, offset: number): Promise<Array<IFood>>
updateImages (id: string, imagePaths: Array<string>):Promise<IFood>
delete (id: string): Promise<Ifood>
deleteImage (id: string, imagePath: Array<string>) Promise<IFood>
random (): Promise<IFood>
search (query: string, type: string): Promise<IFood>
readShortId (shortId: string): Promise<IFood>
randomShortId (): Promise<IFood>
randomWithImage (n: number): Promise<IFood>
}

FoodSchema.statics.read = function (id: string): Promise<Ifood> {
    return this.findById(id)
}
FoodSchema.statics.readA11 = function (): Promise<Array<IFood>> {
    return this.find()
}
FoodSchema. statics.readType = async function (type: string): Promise<Array<IFood>> {
    if (foodTypeCache[type]) {
        return foodTypeCache[type]
    }
    const foods = await this.find({ type })

    constimageFirstFood = foods.filter((food: IFood): boolean => food.images.legth > 0) .concat(foods.filter((food: Ifood): boolean => food.images.length <=0))
    if (imageFirstFood.length > 0){
        foodTypeCache[type] = imageFirstFood
    } 
    return imageFirstFood
}

FoodSchema.statics.paginateType = async function (type: string, page: number = 1, offset: number = 12): Promise<Array<IFood>>{
    if (foodTypeCache[type]){
        console.log('from cache')
        return foodTypeCache[type.slice((page - 1)offset, page * offset)
    }
}