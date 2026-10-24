export async function findOne({model , filter , options} = {}) {
    const result = await model.findOne(filter , options)
    return result
}

export async function findById({model , id , projection} = {}) {
    const result = await model.findById(id , projection)
    return result
}

export async function create({ model, data, options } = {}) {
  return await model.create([data], options);
}
