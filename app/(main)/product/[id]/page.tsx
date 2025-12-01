interface Props {
  params: Promise<{ id: string }>;
}
const page = async ({ params }: Props) => {
  const { id } = await params;

  return <div className="p-2">Product details: {id}</div>;
};

export default page;
