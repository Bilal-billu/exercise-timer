import { Icon } from "@iconify-icon/react"
import '../../Additional.css'

export default function DisplayMiniCard({ item, mouseDown, mouseUp }) {
  const run = "bx:run";
  const rest = "healthicons:exercise-yoga";
  return (
    <div className='d-flex flex-row p-3 loadAnimation'
      onMouseDown={() => mouseDown(item.id)}
      onMouseUp={mouseUp}
      onTouchStart={() => mouseDown(item.id)}
      onTouchEnd={mouseUp}
    >
      <h1><Icon icon={!item.stateDone ? run : rest} /></h1>
      <h5 className={`m-1 ${(item.stateDone ? 'text-decoration-line-through' : '')}`}>{item.name} {item.times} {item.type}</h5>
    </div>
  )
}
