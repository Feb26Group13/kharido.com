function AdminVendors() {

  return (

    <div className="admin-page">

      <h1>Vendor Management</h1>

      <hr />

      <div className="customer-box">

        <h2>Vendor List</h2>

        <table className="admin-table">

          <thead>

            <tr>
              <th>Vendor Name</th>
              <th>Email</th>
              <th>Products</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td>Tech Store</td>
              <td>techstore@gmail.com</td>
              <td>45</td>
              <td>
                <span className="status completed">
                  Active
                </span>
              </td>
              <td>
                <button className="view-btn">
                  View
                </button>

                <button className="delete-btn">
                  Block
                </button>
              </td>
            </tr>

            <tr>
              <td>Fashion Hub</td>
              <td>fashionhub@gmail.com</td>
              <td>78</td>
              <td>
                <span className="status completed">
                  Active
                </span>
              </td>
              <td>
                <button className="view-btn">
                  View
                </button>

                <button className="delete-btn">
                  Block
                </button>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminVendors;