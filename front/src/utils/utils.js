const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split("/");
  // console.log("parseRequestUrl", request);
  return {
    resource: request[1] || null,
    id: request[2] || null,
    action: request[3] || null,
  };
};

export default parseRequestUrl;
