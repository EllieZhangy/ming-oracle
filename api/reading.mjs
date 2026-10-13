import {handleReading} from '../ai/http.mjs';
export default {fetch(request){return handleReading(request,process.env);}};
