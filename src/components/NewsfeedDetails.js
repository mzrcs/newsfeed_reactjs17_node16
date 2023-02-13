
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const NewsfeedDetails = ({ newsfeed }) => {
  
  return (
    <div  className=" flex flex-col justify-center items-center ">
      <div className="grid--container">
        <div className="grid--image abc" style={{ 'backgroundImage': "url(" + newsfeed?.urlToImage + ")" }}></div>
        <div className="grid--content p-8 shadow-2xl">
          <h1 className="">Author : {newsfeed?.author}</h1>
          <h4 className="">Source : {newsfeed?.source.name}</h4>
          <h4 className="">Published at : {formatDistanceToNow(new Date(newsfeed?.publishedAt), { addSuffix: true })}</h4>
          <p className="card--content leading-tight mb-4">{newsfeed?.description}</p>
        </div>
      </div>
    </div>
  )
}

export default NewsfeedDetails