interface Props {
  params: Promise<{ id: string }>;
}
const page = async ({ params }: Props) => {
  const { id } = await params;

  return <div>Product ID: {id}</div>;
};

export default page;
