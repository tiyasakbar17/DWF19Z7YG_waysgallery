import { combineReducers } from "redux";
import Auth from './Auth'
import PopUp from './PopUp'
import Posts from './Posts'
import Hired from './Hired'

const Reducers = combineReducers({ Auth, PopUp, Posts, Hired });


export default Reducers;
