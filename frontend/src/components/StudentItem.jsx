function StudentListItem({name, surname, extra}) {
    return (<li>
        <div>
            {name}, {surname}, {extra}
        </div>
    </li>)
}

export default StudentListItem