import { Association } from 'sequelize';
import { Course, Item } from '../models';
import { VideoInterface } from '../interface';

export class Video extends Item implements VideoInterface{

    declare static associations: { 
        course: Association<Video, Course>; 
    };
}