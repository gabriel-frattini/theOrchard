const { withPlausibleProxy } = require("next-plausible");

module.exports = withPlausibleProxy()({
  images: {
    domains: ["raw.githubusercontent.com", "res.cloudinary.com"],
  },
});
