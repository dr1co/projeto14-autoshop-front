export default function AddProductButton({onClick}){
  return(
    <button onClick={() => onClick(false)}>Adicionar Produto</button>
  );
}