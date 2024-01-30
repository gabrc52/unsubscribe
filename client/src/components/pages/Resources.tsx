import React from "react";
import { Link } from "react-router-dom";
import "./Resources.css";

// Masterlist of resources for food insecurity at MIT, with links to each resource's website.

const Resources = () => {
  return (
    <div className="Resources">
      <div className="u-hideOverflow Resources-container">
        <div className="u-flexColumn Resources-textContainer">
          <h1>Resources</h1>
          <div className="u-flex u-flex-justifyCenter u-flex-alignCenter">
            <p>
              Here are some resources for food insecurity at MIT. If you know of any other resources
              that should be added to this list, please let us know at{" "}
              <strong>
                <a href="mailto:unsubscribe-admin@mit.edu">Unsubscribe-admin@mit.edu</a>
              </strong>
              .
            </p>
          </div>
          <h2>Websites:</h2>
          <ul>
            <li>
              <a href="https://studentlife.mit.edu/s3/money-food-resources/food-resources">
                MIT Food Resources via S^3
              </a>
            </li>
            <li>
              <a href="https://doingwell.mit.edu/foodandfinancial/">
                Food and Financial Resources via MIT Office of Student Wellbeing
              </a>
            </li>
            <li>
              Via{" "}
              <a href="https://oge.mit.edu/student-finances/financial-assistance-and-grants/food-insecurity/">
                Office of Graduate Education
              </a>
              :
              <ul className="a">
                <li>
                  <a href="https://www.google.com/maps/d/u/0/viewer?ll=42.360563087188545%2C-71.09648094149668&z=16&mid=1i0YNzpQzO2Zou13n9ZahvjL1L7feLFA5">
                    MIT Food & Grocery Map
                  </a>
                  : This interactive map showcases area grocery stores, on-campus dining locations,
                  and local favorite food spots.
                </li>
                <li>
                  <a href="https://docs.google.com/presentation/d/1rQ0hjf1Zs8_6yBuSKKYdFXp8yx1KUFwRhR53gYRg2QQ/edit#slide=id.p">
                    Cooking with Antoinette
                  </a>
                  : This cookbook was created by the International Student Office and has over 50
                  easy-to-follow recipes.
                </li>
                <li>
                  <a href="http://web.mit.edu/facilities/transportation/shuttles/grocery.html">
                    Grocery Shuttles
                  </a>
                  : See when MIT's grocery shuttle runs to Costco, Trader Joe's, and Whole Foods.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Resources;
