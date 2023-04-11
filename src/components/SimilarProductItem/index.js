import './index.css'

const GetItem = props => {
  const {item} = props
  const newData = {
    imageUrl: item.image_url,
    title: item.title,
    brand: item.brand,
    price: item.price,
    rating: item.rating,
  }
  return (
    <li className="list-item">
      <img src={newData.imageUrl} alt="similar product" className="image" />
      <p className="titleOf">{newData.title}</p>
      <p className="brandOf">by {newData.brand}</p>
      <div className="rupe-cont">
        <p className="priceOf">Rs {newData.price}/-</p>
        <div className="rate-cont">
          <p className="ratingOf">{newData.rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}
export default GetItem
