import { merge, cloneDeep } from 'es-toolkit'

export function toMerged(target: any, source: any) {
    return merge(cloneDeep(target), source)
}
