import DormForm from "./DormForm";

const DormAdd = () => {
  const handleSubmit = (dormName: number | "", dormAddress: string) => {
    // Handle form submission logic here
    console.log({ dormName, dormAddress });
  };

  return (
    <DormForm
      onSubmit={handleSubmit}
      submitButtonText="Pridėti bendrabutį"
      title="Pridėti bendrabutį"
    />
  );
};

export default DormAdd;