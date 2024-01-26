function Card(props) {
  return (
    <div>
      <h1>{props.equipment.equipment_name}</h1>
      <h2>{props.equipment.type}</h2>
      <h3>{props.equipment.available}</h3>
    </div>
  );
}

export default Card;
