const _500= () => {
    return <h1>500 - Internal error</h1>;
  };
  
  export async function getServerSideProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    };
  }
  export default _500;
  
  