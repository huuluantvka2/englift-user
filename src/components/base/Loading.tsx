import { PulseLoader } from "react-spinners"

const Loading = (props: { color?: string, size?: number }) => {
    const { color, size } = props
    return (
        <div className="flex justify-center items-center min-h-[200px]" >
            <PulseLoader size={size ?? 16} color={color ?? '#fb397d'} speedMultiplier={1} />
        </div>
    )
}
export default Loading