const { default: CreatePostClass } = require("../../classes/Posts/CreatePost");

const createPost = async () => {
  console.log("createPost function called");

  let create = new CreatePostClass(".gridMain");
  create.render();
};
export default createPost;
