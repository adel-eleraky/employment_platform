export default function formatDate(date) {

    const localDate = new Date(date);

    const formattedDate = localDate.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    return formattedDate
}