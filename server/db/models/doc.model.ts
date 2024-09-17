import { Association } from 'sequelize';
import { Course ,Item } from '../models';
import { DocInterface } from '../interface';

export class Doc extends Item implements DocInterface{
    declare docName: string;
    
    declare static associations: { 
        course : Association<Doc, Course>; 
    };
}