// created this file to make refrenceing to this file shroter in other files
// for example, in the App.tsx you orginally had this: import ListGroup from "./components/ListGroup/ListGroup"
// but because that is too long, you created this index file. Then in the App.tsx you will only use "import ListGroup from "./components/ListGroup";"
// thats because the ListGroup component is actually listed in that index file

import ListGroup from "./ListGroup";
import ListGroupWithStyled from "./ListGroupwithStyled";
import ListGroupMaterialUI from "./ListGroupMaterialUI";

export { ListGroup, ListGroupWithStyled, ListGroupMaterialUI };
