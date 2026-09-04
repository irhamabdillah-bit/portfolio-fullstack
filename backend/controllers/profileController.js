const getProfile = (req, res) => {
  const profile = {
    name: "Muhammad Irham Abdillah",
    role: "Web Developer",
    description: "Saya sedang belajar menjadi Full Stack Web Developer",
  };
  res.json(profile);
};

module.exports = {
  getProfile,
};
