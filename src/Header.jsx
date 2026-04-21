import "./Header.css";

function Header({ onSignupClick }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    if (e.target.value === "logout") {
      localStorage.removeItem("user");
      window.location.reload();
    }
    if (e.target.value === "profile") {
      alert("profile page coming soon");
    }
    if (e.target.value === "orders") {
      alert("Order page coming soon");
    }
  };

  return (
    <>
      <div className="top-bar">
        <div className="left-group">
          <span>🚚 Free Shipping</span>
          <span>↩ Return To Store</span>
          <span>🎁 Online Gift Card</span>
        </div>

        <div className="right-group">
          <span>📍 Delivering To</span>
          <span>📱 Download Our Apps</span>
          <span>Store Locator</span>
          <span>Help</span>
        </div>
      </div>

      <div className="main-nav">
        <div className="logo">max</div>

        <input
          className="search-box"
          type="text"
          placeholder="What are you looking for?"
        />

        <div className="nav-actions">
          {user ? (
            <div className="account-section">
              <div className="account-icon">{"\u{1F464}"}</div>

              <select
                className="account-select"
                onChange={handleChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Account
                </option>
                <option value="profile">Profile</option>
                <option value="orders">Orders</option>
                <option value="logout">Logout</option>
              </select>
            </div>
          ) : (
            <button className="signup-btn" onClick={onSignupClick}>
              SIGN UP / SIGN IN
            </button>
          )}

          <span>♡ Favourites</span>
          <span>👜 Basket</span>
        </div>
      </div>

      <div className="category-navbar">
        <div className="category-item">
          <img src="/images/polo.jpg" alt="Polo" />
          <p>Polo Shop</p>
        </div>
        <div className="category-item">
          <img src="/images/genz.jpg" alt="GenZ" />
          <p>GenZ Store</p>
        </div>
        <div className="category-item">
          <img src="/images/women.jpg" alt="Women" />
          <p>Women</p>
        </div>
        <div className="category-item">
          <img src="/images/men.jpg" alt="Men" />
          <p>Men</p>
        </div>
        <div className="category-item">
          <img src="/images/kids.jpg" alt="Kids" />
          <p>Kids</p>
        </div>
        <div className="category-item">
          <img src="/images/sports.jpg" alt="Sports" />
          <p>Max Sport</p>
        </div>
      </div>
    </>
  );
}

export default Header;