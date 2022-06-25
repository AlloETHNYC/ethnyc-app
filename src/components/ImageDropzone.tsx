import { Group, MantineTheme, Text, useMantineTheme } from "@mantine/core";
import {
  Dropzone,
  DropzoneProps,
  DropzoneStatus,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import { IconProps, Photo, Upload, X } from "tabler-icons-react";

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

const ImageUploadIcon = ({
  status,
  ...props
}: IconProps & { status: DropzoneStatus }) => {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
};

const ImageDropzone = (props: Omit<DropzoneProps, "children">) => {
  const theme = useMantineTheme();

  return (
    <Dropzone accept={IMAGE_MIME_TYPE} {...props}>
      {(status) => (
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: 220, pointerEvents: "none" }}
        >
          <ImageUploadIcon
            status={status}
            style={{ color: getIconColor(status, theme) }}
            size={80}
          />

          <div>
            <Text size="xl" inline>
              Drag image here or click to select file
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach only a single files, the file should not exceed 5mb
            </Text>
          </div>
        </Group>
      )}
    </Dropzone>
  );
};

export default ImageDropzone;
