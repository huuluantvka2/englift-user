import { IMultipleChoice } from "@/model/word"
import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2"

export const generateRequest = (obj: Object) => {
    let str = '?'
    for (let [key, value] of Object.entries(obj)) {
        if (value != null && value != undefined) str += `${key}=${value}&`
    }
    if (str.length > 1) return str.substring(0, str.length - 1)
    else return ""
}
export const formatDateString = (date: string) => {
    let d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
}

export const showSwalModal = (title: string, description: string, icon: SweetAlertIcon, buttonOkText: string = 'Ok', buttonCancelText: string = 'Hủy'): Promise<SweetAlertResult> => {
    return Swal.fire({
        title: title,
        html: description,
        icon: icon,
        showCancelButton: true,
        confirmButtonText: buttonOkText,
        cancelButtonText: buttonCancelText,
        allowEnterKey: true,
        allowEscapeKey: true,
    })
}

export const showSwalMessage = (title: string, description: string, icon?: SweetAlertIcon): Promise<SweetAlertResult> => {
    return Swal.fire(title, description, icon)
}

export const showSwalSuccessMessage = (title: string, timer: number = 1500) => {
    return Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: timer
    })
}

export const renderBadgeClassname = (position: string) => {
    switch (position.toLowerCase().trim()) {
        case 'noun': case 'danh từ': return 'badge-green'
        case 'verb': case 'động từ': return 'badge-red'
        case 'adjective': case 'tính từ': return 'badge-purple'
        default: return 'badge-blue'
    }
}

export const renderBorderClassname = (index: number) => {
    const devide = index % 4;
    switch (devide) {
        case 0: return 'border-green'
        case 1: return 'border-red'
        case 2: return 'border-purple'
        default: return 'border-blue'
    }
}

export const handlePlayMP3 = (mp3) => {
    let audio = new Audio(mp3)
    audio.play()
}

/**
 * Random from 0 to x
 */
export const randomFromZeroToNumber = (to: number) => {
    to++
    return Math.floor(Math.random() * to)
}
export const renderClassAnswerMultipleChoice = (question: IMultipleChoice, index: number): string => {
    if (((question.is_correct === undefined || question.is_correct === true) && question.key_answer === index) || (question.is_correct === false && question.key_correct === index)) {
        return 'choose'
    } else if (question.is_correct === false && question.key_answer === index) return 'wrong'
    else return ''
}

export const randomList = <T>(list: T[]) => {
    const newList: T[] = []
    while (true) {
        if (list.length) {
            const index = randomFromZeroToNumber(list.length - 1)
            newList.push(list[index])
            list.splice(index, 1)
        } else break;
    }
    return newList
}

export const concatString = <T>(list: T[]) => {
    let str = ''
    list.forEach((x: any) => str += x.value)
    return str.toLowerCase()
}