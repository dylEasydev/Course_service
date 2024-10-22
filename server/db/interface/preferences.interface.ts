import { HistSearchInterface,Matter, VideoInterface, Domain, DocInterface } from '../interface';

export interface Preferences{
    matterSubscribes?: Matter[];
    histSearch?: HistSearchInterface[];
    videoViews?: VideoInterface[];
    videoDisLikes? : VideoInterface[];
    videoComments?:VideoInterface[];
    videoLikes?:VideoInterface[];
    domainSubscribes?:Domain[] ; 
    docViews?: DocInterface[];
    docDisLikes? : DocInterface[];
    docComments? :DocInterface[];
    docLikes?:DocInterface[];
}