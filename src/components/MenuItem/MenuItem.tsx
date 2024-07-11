import "./MenuItem.scss"

export default function MenuItem(props: any) {
  const categories = props.categories
  return (
    <div className="menu-item-container p-4 mb-2">
      <h6 className="mb-3">{props?.name}</h6>
      {categories &&
        categories.length > 0 &&
        categories.map((category: any, index: number) => (
          <div className="my-1" key={`category-item-${index}`}>
            <div className="category-name">{category?.name}</div>
            <div className="ps-3 pt-3">
              {category.items.length > 0 &&
                category.items.map((item: any, index: number) => (
                  <div key={`item-${index}`} className="category-item">
                    {item.name}
                    <hr />
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  )
}
