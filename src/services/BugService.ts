import base from './Service'

const get = async() => 
{
  //console.log('got into get in bug service') 
  const res = await base.get('bugs')
  if (!res.ok) { console.log('response not okay from get') 
  return Promise.reject() }
  return await res.json()
}

const query = async(query: string) =>
{
  const res = await base.get(`bugs/?query=${query}`)
  if (!res.ok) return Promise.reject()
  return await res.json();
}

const getById = async(id: number) => 
{

  const res = await base.get(`bugs/?id=${id}`)
  if (!res.ok) return Promise.reject()
  return await res.json()
}

const post = async(bug) =>
{
  const res = await base.post('bugs', bug)
  if (!res.ok) return Promise.reject()
  return await res.json();
}

const put = async(bug) =>
{
  try {
    const res = await base.put(`bugs/${bug.id}`, bug)
    if (!res.ok) return Promise.reject()
    return await res.json();
  }
  catch (err)
  {
    return Promise.reject()
  }
}

const remove = async(id: number) =>
{
  try {
    const res = await base.delete(`bugs/?id=${id}`)
    if (!res.ok) return Promise.reject()
    return await res.json();
  }
  catch (err)
  {
    return Promise.reject()
  }
}

export {put, post, get, query, getById, remove};