const Fs = require('fs')
const Path = require('path')

const getBlockSize = async (path) => {
	const tempDir = await Fs.promises.mkdtemp(path)
	try {
		const filePath = Path.join(tempDir, 'dummy')
		await Fs.promises.appendFile(filePath, 'a')

		const stats = await Fs.promises.stat(filePath)
		return stats.blksize
	} finally {
		await Fs.promises.rm(tempDir, { recursive: true })
	}
}

const getBlockSizeSync = (path) => {
	const tempDir = Fs.mkdtempSync(path)
	try {
		const filePath = Path.join(tempDir, 'dummy')
		Fs.appendFileSync(filePath, 'a')

		const stats = Fs.statSync(filePath)
		return stats.blksize
	} finally {
		Fs.rmSync(tempDir, { recursive: true })
	}
}

module.exports = {
	getBlockSize,
	getBlockSizeSync,
}
