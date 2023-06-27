import { motion } from "framer-motion"
export interface IEngliftButton {
    name: string,
    className?: string,
    onClick?: any,
    icon?: string,
    disabled?: boolean,
    widthIcon?: string
    type?: "button" | "submit" | "reset" | undefined
}

const EngliftButton = (props: IEngliftButton) => {
    let { name, className, icon, disabled, widthIcon, onClick, type } = props
    className += disabled === true ? ' opacity-60 cursor-not-allowed' : ' cursor-pointer'
    return (
        <>
            <motion.button type={type ?? 'button'} whileTap={{ scale: 0.9 }} onClick={onClick} disabled={disabled} className={`btn-englift ${className || ''}`}>
                {icon && <img width={widthIcon ?? "20px"} src={icon}></img>}
                <div className="text-center">{name}</div>
            </motion.button>
        </>
    )
}

export default EngliftButton