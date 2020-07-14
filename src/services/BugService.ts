import base from './Service'

const get = async() => 
{

  const res = await base.get('bugs')
  if (!res.ok) return Promise.reject()
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
  const res = await base.post('bugs', {bug})
  if (!res.ok) return Promise.reject()
  return await res.json();
}

export {post, get, query, getById};