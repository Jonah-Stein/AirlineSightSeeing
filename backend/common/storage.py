from django.core.files.storage import default_storage


client = default_storage.connection.meta.client
bucket_name = default_storage.bucket_name


def get_presigned_url(path, seconds=300):
    return client.generate_presigned_url(
        "get_object",
        Params={"Bucket": bucket_name, "Key": path},
        ExpiresIn=seconds,
    )
