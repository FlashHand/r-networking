```javascript
import {service_providers} from 'r-networking';
//创建一个api
const postSomething = async ()=>{
  return service_providers.our_v2.createPost('/something/post');
}
```
