import './SkeletonCard.css'
function SkeletonCard() {
  return (
    <div className="movie-card skeleton">
      <div className="poster"></div>
      <div className="text"></div>
    </div>
  );
}
export default SkeletonCard;