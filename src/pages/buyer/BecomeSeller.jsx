import { Link } from "react-router-dom";
import "./BecomeSeller.css";

function BecomeSeller() {
  return (
    <div className="become-seller-container">

      <div className="become-seller-card">

        <h2>Seller Application</h2>

        <p className="intro">
          Complete this form to apply for seller privileges.
          Your request will be reviewed by the admin before approval.
        </p>

        <div className="form-group">
          <label>College UID</label>
          <input type="text" placeholder="Enter your UID" />
        </div>

        <div className="form-group">
          <label>Shop Name</label>
          <input type="text" placeholder="Enter your shop name" />
        </div>

        <div className="form-group">
          <label>Shop Description</label>
          <textarea
            placeholder="Describe your shop and what you sell"
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Product Category</label>
          <select>
            <option>Select product type</option>
            <option>Food & Beverages</option>
            <option>Handmade Crafts</option>
            <option>Thrift Clothing</option>
            <option>Stationery</option>
            <option>Jewellery</option>
          </select>
        </div>

        <p className="status">
          Application Status: Pending Admin Approval
        </p>

        <div className="button-row">
          <button className="submit-btn">Submit Application</button>

          <Link to="/buyer">
            <button className="cancel-btn">Cancel</button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default BecomeSeller;

