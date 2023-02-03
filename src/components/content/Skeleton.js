import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader

    speed={2}
    width={400}
    height={460}
    viewBox="0 0 500 460"
    backgroundColor="#808a93"
    foregroundColor="#ecebeb"
   
  >
    <rect x="44" y="218" rx="3" ry="3" width="172" height="20" />
    <rect x="45" y="366" rx="3" ry="3" width="178" height="10" />
    <circle cx="125" cy="102" r="90" />
    <rect x="46" y="277" rx="3" ry="3" width="172" height="40" />
  </ContentLoader>
);

export default Skeleton
