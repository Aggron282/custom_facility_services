var css_url = "./assets/css/";

module.exports = [

  {
    heading_1:"Make Your Windows",
    heading_2:"Look Spotless Today!",
    showcase_img:"./assets/images/k.png",
    className:"showcase_container--home",
    css_file:`${css_url}home.css`,
  },
  {
    heading_1:"Learn About Us",
    heading_2:"Values & Services",
    css_file:`${css_url}about.css`,
    className:"showcase_container--about",

    showcase_img:"./assets/images/about_showcase_1.jpg"
  },
  {
    heading_1:"Contact Us Today!",
    heading_2:"We are Happy to Help!",
    css_file:`${css_url}contact_us.css`,
    className:"showcase_container--contact",

    showcase_img:"./assets/images/contact_us_b.png",
  },
  {
    css_file:`${css_url}quote.css`,
    heading_1:"In a Hurry?",
    className:"showcase_container--schedule",

    heading_2:"Get a Quick Quote Below!",
    showcase_img:"./assets/images/showcase_3.png",
  }

]
