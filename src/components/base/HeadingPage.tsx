const HeadingPage = (props: { title: string }) => {
    const { title } = props
    return (
        <div className="w-full my-5">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold py-3 heading-page">
                {title}
            </h2>
        </div>
    )
}

export default HeadingPage