import { Grid } from  'react-loader-spinner'


function Loader() {
  return (
    <div className='loader'>
      <Grid
        height="80"
        width="80"
        color="#810CA8"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    />
    </div>
  );
}

export default Loader;
