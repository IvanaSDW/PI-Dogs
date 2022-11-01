import "./newBreed.css";
import Footer from "../../footer/Footer";
import NavBar from "../../header/NavBar";

const NewBreed = () => {
  return (
    <div>
      <NavBar />
      <div className="new-breed-screen">
        <div className="form-card">
          <h2 className="card-title">Create new breed</h2>
          <div className="card-body">
            <img
              src="https://placedog.net/300/340?r"
              alt="new breed"
              className="new-breed-image"
            />
            <form action="submit" className="breed-form">
              <div className="form-group">
                <label htmlFor="inputName" className="name-group" >Breed Name</label>
                <input
                  type="text"
                  className="form-control name-input"
                  placeholder="Breed name"
                  name="name"
                />
              </div>
              <div className="form-group">
                <label>Height</label>
                <div className="double-input">
                  <div className="sub-input">
                    <label className="sub-label" htmlFor="heightMin">
                      Min
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="height min"
                      name="heightMin"
                    />
                  </div>
                  <div className="sub-input">
                    <label className="sub-label" htmlFor="heightMax">
                      Max
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="height max"
                      name="heightMax"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Weight</label>
                <div className="double-input">
                  <div className="sub-input">
                    <label className="sub-label" htmlFor="heightMin">
                      Min
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="height min"
                      name="heightMin"
                    />
                  </div>
                  <div className="sub-input">
                    <label className="sub-label" htmlFor="heightMax">
                      Max
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="height max"
                      name="heightMax"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Life span</label>
                <div className="double-input">
                  <div className="sub-input">
                    <label className="sub-label" htmlFor="heightMin">
                      Min
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="height min"
                      name="heightMin"
                    />
                  </div>
                  <div className="sub-input">
                    <label className="sub-label" htmlFor="heightMax">
                      Max
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="height max"
                      name="heightMax"
                    />
                  </div>
                </div>
              </div>
              <button className="create-button" type="submit">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default NewBreed;
