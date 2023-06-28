const HeadingPage = (props: { title: string }) => {
    const { title } = props
    return (
        <div className="w-full my-5">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold py-3 heading-page">
                {title}
            </h2>
        </div>
    )
}

export default HeadingPage