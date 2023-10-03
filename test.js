const x = {
	uploadUrl:
		'https://weshare-files-f580653569d9448051c95bab723e846b.s3.eu-west-2.amazonaws.com/shares/9/b/9b6f85ae-1e55-4adf-9688-c8dcbe12a4b1?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAYEX66AYDDXT2ZXVG%2F20231003%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231003T020114Z&X-Amz-Expires=86400&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCWV1LXdlc3QtMiJHMEUCIQDgVOLtkFaNxMsxuXKjEyj5TfYbmh0DL2N3RpvX7ANcjAIgeicGuhyGvOc%2B0mAU4FBro%2BR0%2FTexlkA7sC2RuheE0LYqjQMIIxABGgw1NTk5NTQxMzQ1MzQiDLMITDWIB5X8k4u%2FOCrqAiiFCCN3W9y6orYLNVshUvXGD15SAdoMYq9QuhMQXU5cx8tZWxpDiC4lNa4cqqz3shLYi6HVaWDG3hekZSfXOAWHbVYnnjQvq7Y%2FIFuMjupOSrfu6qgA39%2BzZA8ytEsOeok6sxZXDYPY6IMRUYaW%2BM%2FmX%2BMHxT6JSTm0%2FPSbZCc9kCj2FXPZNjnLpQY1P4A978Mx0tqEx0rO%2BmH%2BbsIVb4ybhOTYyD1Vus2PeWynRfv9IJKKof%2FXwoJ3VuaJNK67KFrLhBiQmK3tC3hpnVkQMc1SWakRQ%2BqrE64e6drVoISPZBUYhHTKINlrdK4yrOGfEzv%2BkrQWoPdX6KQaU4JFGMq2xf0SD8saLdB%2BYFo%2BF8vpQrcW5CrwwN3x14qEfx1r8m9OxgX8BxxxKi2LBo3bf%2FtVy6iEAuHn2O8bPZnQ4Xm06ThSSBpqoNJOnHnvfu6%2BpPL8LsdxFKxj9zS6TTc80jly0H3AuYsW6%2FBgMOjr7agGOp0ByFfxqyfKhqvWsi6eW5pYeBMqUyVlmG6Vfav4j%2BP5d3dV1mpL2s5SGdnNy%2FoW2iO0%2Fq7uNyZXc4ADn02kSmjgCBNQ7qdw58qOTzPe1ftsYVcK0ARdOnT1fPZIrvl3O5z%2FrbGkmBS9OLE%2BwisDHJ4GwzyfXXrsZ3pvj37cxF%2BXRgWbHW9CeTr0s%2BerP54ozPwesAVECta7la67hIH68A%3D%3D&X-Amz-Signature=e55a14bc094f08552a08b9d2d7904215166b7ca03d62da3bf8b5623cbdd25bf4&X-Amz-SignedHeaders=host&x-id=PutObject',
	downloadUrl:
		'https://weshare-files-f580653569d9448051c95bab723e846b.s3.eu-west-2.amazonaws.com/shares/9/b/9b6f85ae-1e55-4adf-9688-c8dcbe12a4b1?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAYEX66AYDDXT2ZXVG%2F20231003%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231003T020114Z&X-Amz-Expires=86400&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCWV1LXdlc3QtMiJHMEUCIQDgVOLtkFaNxMsxuXKjEyj5TfYbmh0DL2N3RpvX7ANcjAIgeicGuhyGvOc%2B0mAU4FBro%2BR0%2FTexlkA7sC2RuheE0LYqjQMIIxABGgw1NTk5NTQxMzQ1MzQiDLMITDWIB5X8k4u%2FOCrqAiiFCCN3W9y6orYLNVshUvXGD15SAdoMYq9QuhMQXU5cx8tZWxpDiC4lNa4cqqz3shLYi6HVaWDG3hekZSfXOAWHbVYnnjQvq7Y%2FIFuMjupOSrfu6qgA39%2BzZA8ytEsOeok6sxZXDYPY6IMRUYaW%2BM%2FmX%2BMHxT6JSTm0%2FPSbZCc9kCj2FXPZNjnLpQY1P4A978Mx0tqEx0rO%2BmH%2BbsIVb4ybhOTYyD1Vus2PeWynRfv9IJKKof%2FXwoJ3VuaJNK67KFrLhBiQmK3tC3hpnVkQMc1SWakRQ%2BqrE64e6drVoISPZBUYhHTKINlrdK4yrOGfEzv%2BkrQWoPdX6KQaU4JFGMq2xf0SD8saLdB%2BYFo%2BF8vpQrcW5CrwwN3x14qEfx1r8m9OxgX8BxxxKi2LBo3bf%2FtVy6iEAuHn2O8bPZnQ4Xm06ThSSBpqoNJOnHnvfu6%2BpPL8LsdxFKxj9zS6TTc80jly0H3AuYsW6%2FBgMOjr7agGOp0ByFfxqyfKhqvWsi6eW5pYeBMqUyVlmG6Vfav4j%2BP5d3dV1mpL2s5SGdnNy%2FoW2iO0%2Fq7uNyZXc4ADn02kSmjgCBNQ7qdw58qOTzPe1ftsYVcK0ARdOnT1fPZIrvl3O5z%2FrbGkmBS9OLE%2BwisDHJ4GwzyfXXrsZ3pvj37cxF%2BXRgWbHW9CeTr0s%2BerP54ozPwesAVECta7la67hIH68A%3D%3D&X-Amz-Signature=13498d499296670ad9c572245287ae7a5ee8c67cc2d5ede00bad7f18c3c422dd&X-Amz-SignedHeaders=host&x-id=GetObject',
};