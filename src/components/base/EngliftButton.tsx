export interface IEngliftButton {
    name: string,
    className?: string,
    onClick?: object,
    icon?: string,
    disabled?: boolean,
    widthIcon?: string
}

const EngliftButton = (props: IEngliftButton) => {
    let { name, className, icon, disabled, widthIcon, onClick } = props
    className += disabled === true ? ' opacity-60 cursor-not-allowed' : ' cursor-pointer'
    return (
        <button disabled={disabled} className={`btn-englift ${className || ''}`}>
            {icon && <img width={widthIcon ?? "20px"} src={icon}></img>}
            <div className="text-center">{name}</div>
        </button>
    )
}

export default EngliftButton