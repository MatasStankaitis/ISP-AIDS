import DormForm from "./DormForm";

const DormEdit = () => {
  const handleSubmit = (dormName: number | "", dormAddress: string) => {
    // Handle form submission logic here
    console.log({ dormName, dormAddress });
  };

  return (
    <DormForm
      onSubmit={handleSubmit}
      submitButtonText="Išsaugoti pakeitimus"
      title="Redaguoti bendrabutį"
    />
  );
};

export default DormEdit;